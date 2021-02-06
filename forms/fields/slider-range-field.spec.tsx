import { Form } from 'react-final-form';
import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { SliderRangeField, Props } from './slider-range-field';
import { Slider } from '@material-ui/core';
import { act } from 'react-dom/test-utils';
import { mockAllProviderHooks } from 'public/mocks';

const mocks = {
  onSubmit: (values: unknown) => undefined
};

function TestComponent(props: Props) {
  return (
    <Form onSubmit={mocks.onSubmit}>
      {formProps => (
        <form onSubmit={formProps.handleSubmit}>
          <SliderRangeField {...props} />
        </form>
      )}
    </Form>
  );
}

describe('Slider range field', () => {
  let wrapper: ReactWrapper<any, any, any>;
  const spy = jest.spyOn(mocks, 'onSubmit');

  beforeAll(() => {
    mockAllProviderHooks();
  });

  describe('with undefined values', () => {
    beforeEach(() => {
      wrapper = mount(
        <TestComponent
          name={'test'}
          // @ts-ignore
          initialValue={{ min: undefined, max: undefined }}
          min={5}
          max={10}
        />
      );
    });

    it('renders two handles', () => {
      expect(wrapper.find('.MuiSlider-thumb')).toHaveLength(2);
      expect(
        wrapper.find('.MuiSlider-thumb').filter({ 'data-index': 1 })
      ).toHaveLength(1);
      expect(
        wrapper.find('.MuiSlider-thumb').filter({ 'data-index': 0 })
      ).toHaveLength(1);
    });

    it('the handles are placed on extremums', () => {
      expect(
        wrapper
          .find('.MuiSlider-thumb')
          .filter({ 'data-index': 1 })
          .prop('style')
      ).toEqual({ left: '100%' });
      expect(
        wrapper
          .find('.MuiSlider-thumb')
          .filter({ 'data-index': 0 })
          .prop('style')
      ).toEqual({ left: '0%' });
      expect(wrapper.text()).toContain('no limits');
      expect(wrapper.text()).toContain('5');
      expect(wrapper.text()).not.toContain('10');
      expect(wrapper.text()).toContain('from');
      expect(wrapper.text()).not.toContain('upto');
    });

    it('delivers proper values on submit', () => {
      wrapper.find('form').simulate('submit');
      expect(spy).toHaveBeenCalledWith(
        {
          test: {
            min: undefined,
            max: undefined
          }
        },
        expect.anything(),
        expect.anything()
      );
      spy.mockClear();
    });

    describe('after moving max handle', () => {
      beforeEach(() => {
        act(() => {
          wrapper.find(Slider).first().prop('onChange')!(undefined as any, [
            5,
            9
          ]);
        });
      });

      it('delivers proper values on submit', () => {
        wrapper.find('form').simulate('submit');
        expect(spy).toHaveBeenCalledWith(
          {
            test: {
              min: undefined,
              max: 9
            }
          },
          expect.anything(),
          expect.anything()
        );
        spy.mockClear();
      });
    });

    describe('after moving min handle', () => {
      beforeEach(() => {
        act(() => {
          wrapper.find(Slider).first().prop('onChange')!(undefined as any, [
            6,
            10
          ]);
        });
      });

      it('delivers proper values on submit', () => {
        wrapper.find('form').simulate('submit');
        expect(spy).toHaveBeenCalledWith(
          {
            test: {
              min: 6,
              max: undefined
            }
          },
          expect.anything(),
          expect.anything()
        );
        spy.mockClear();
      });
    });
  });

  describe('with extrememum values', () => {
    beforeEach(() => {
      wrapper = mount(
        <TestComponent
          name={'test'}
          initialValue={{ min: 5, max: 10 }}
          min={5}
          max={10}
        />
      );
    });

    it('renders two handles', () => {
      expect(wrapper.find('.MuiSlider-thumb')).toHaveLength(2);
      expect(
        wrapper.find('.MuiSlider-thumb').filter({ 'data-index': 1 })
      ).toHaveLength(1);
      expect(
        wrapper.find('.MuiSlider-thumb').filter({ 'data-index': 0 })
      ).toHaveLength(1);
    });

    it('the handles are placed on extremums', () => {
      expect(
        wrapper
          .find('.MuiSlider-thumb')
          .filter({ 'data-index': 1 })
          .prop('style')
      ).toEqual({ left: '100%' });
      expect(
        wrapper
          .find('.MuiSlider-thumb')
          .filter({ 'data-index': 0 })
          .prop('style')
      ).toEqual({ left: '0%' });
      expect(wrapper.text()).toContain('no limits');
      expect(wrapper.text()).toContain('5');
      expect(wrapper.text()).not.toContain('10');
      expect(wrapper.text()).toContain('from');
      expect(wrapper.text()).not.toContain('upto');
    });

    it('delivers proper values on submit', () => {
      wrapper.find('form').simulate('submit');
      expect(spy).toHaveBeenCalledWith(
        {
          test: {
            min: 5,
            max: 10
          }
        },
        expect.anything(),
        expect.anything()
      );
      spy.mockClear();
    });
  });

  describe('with max handle set lower', () => {
    beforeEach(() => {
      wrapper = mount(
        <TestComponent
          name={'test'}
          // @ts-ignore
          initialValue={{ min: undefined, max: 9 }}
          min={5}
          max={10}
        />
      );
    });

    it('renders two handles', () => {
      expect(wrapper.find('.MuiSlider-thumb')).toHaveLength(2);
      expect(
        wrapper.find('.MuiSlider-thumb').filter({ 'data-index': 1 })
      ).toHaveLength(1);
      expect(
        wrapper.find('.MuiSlider-thumb').filter({ 'data-index': 0 })
      ).toHaveLength(1);
    });

    it('the handles are placed on extremums', () => {
      expect(
        wrapper
          .find('.MuiSlider-thumb')
          .filter({ 'data-index': 1 })
          .prop('style')
      ).toEqual({ left: '80%' });
      expect(
        wrapper
          .find('.MuiSlider-thumb')
          .filter({ 'data-index': 0 })
          .prop('style')
      ).toEqual({ left: '0%' });
      expect(wrapper.text()).not.toContain('no limits');
      expect(wrapper.text()).toContain('upto 9');
    });

    it('delivers proper values on submit', () => {
      wrapper.find('form').simulate('submit');
      expect(spy).toHaveBeenCalledWith(
        {
          test: {
            min: undefined,
            max: 9
          }
        },
        expect.anything(),
        expect.anything()
      );
      spy.mockClear();
    });
  });

  describe('with min handle set higher', () => {
    beforeEach(() => {
      wrapper = mount(
        <TestComponent
          name={'test'}
          // @ts-ignore
          initialValue={{ min: 6, max: undefined }}
          min={5}
          max={10}
        />
      );
    });

    it('renders two handles', () => {
      expect(wrapper.find('.MuiSlider-thumb')).toHaveLength(2);
      expect(
        wrapper.find('.MuiSlider-thumb').filter({ 'data-index': 1 })
      ).toHaveLength(1);
      expect(
        wrapper.find('.MuiSlider-thumb').filter({ 'data-index': 0 })
      ).toHaveLength(1);
    });

    it('the handles are placed on extremums', () => {
      expect(
        wrapper
          .find('.MuiSlider-thumb')
          .filter({ 'data-index': 1 })
          .prop('style')
      ).toEqual({ left: '100%' });
      expect(
        wrapper
          .find('.MuiSlider-thumb')
          .filter({ 'data-index': 0 })
          .prop('style')
      ).toEqual({ left: '20%' });
      expect(wrapper.text()).toContain('no limits');
      expect(wrapper.text()).toContain('from 6');
    });

    it('delivers proper values on submit', () => {
      wrapper.find('form').simulate('submit');
      expect(spy).toHaveBeenCalledWith(
        {
          test: {
            min: 6,
            max: undefined
          }
        },
        expect.anything(),
        expect.anything()
      );
      spy.mockClear();
    });
  });

  describe('with both in range', () => {
    beforeEach(() => {
      wrapper = mount(
        <TestComponent
          name={'test'}
          initialValue={{ min: 6, max: 7 }}
          min={5}
          max={10}
        />
      );
    });

    it('renders two handles', () => {
      expect(wrapper.find('.MuiSlider-thumb')).toHaveLength(2);
      expect(
        wrapper.find('.MuiSlider-thumb').filter({ 'data-index': 1 })
      ).toHaveLength(1);
      expect(
        wrapper.find('.MuiSlider-thumb').filter({ 'data-index': 0 })
      ).toHaveLength(1);
    });

    it('the handles are placed on extremums', () => {
      expect(
        wrapper
          .find('.MuiSlider-thumb')
          .filter({ 'data-index': 1 })
          .prop('style')
      ).toEqual({ left: '40%' });
      expect(
        wrapper
          .find('.MuiSlider-thumb')
          .filter({ 'data-index': 0 })
          .prop('style')
      ).toEqual({ left: '20%' });
      expect(wrapper.text()).not.toContain('no limits');
      expect(wrapper.text()).toContain('from 6');
      expect(wrapper.text()).toContain('upto 7');
    });

    it('delivers proper values on submit', () => {
      wrapper.find('form').simulate('submit');
      expect(spy).toHaveBeenCalledWith(
        {
          test: {
            min: 6,
            max: 7
          }
        },
        expect.anything(),
        expect.anything()
      );
      spy.mockClear();
    });

    describe('after moving max handle', () => {
      beforeEach(() => {
        act(() => {
          wrapper.find(Slider).first().prop('onChange')!(undefined as any, [
            6,
            10
          ]);
        });
      });

      it('delivers proper values on submit', () => {
        wrapper.find('form').simulate('submit');
        expect(spy).toHaveBeenCalledWith(
          {
            test: {
              min: 6,
              max: undefined
            }
          },
          expect.anything(),
          expect.anything()
        );
        spy.mockClear();
      });
    });

    describe('after moving min handle', () => {
      beforeEach(() => {
        act(() => {
          wrapper.find(Slider).first().prop('onChange')!(undefined as any, [
            5,
            7
          ]);
        });
      });

      it('delivers proper values on submit', () => {
        wrapper.find('form').simulate('submit');
        expect(spy).toHaveBeenCalledWith(
          {
            test: {
              min: undefined,
              max: 7
            }
          },
          expect.anything(),
          expect.anything()
        );
        spy.mockClear();
      });
    });
  });
});
