import React from 'react';
import {
  makeTestSuite,
  no,
  PropsBase,
  runTests,
  TestBase,
  yes
} from 'react-component-testing-library';
import { Badge, Props } from './badge';
import { mockAllProviderHooks } from '../mocks';

type Names = 'renders children' | 'renders prefix' | 'renders cross';

const tests = makeTestSuite<Names, Props>(it => {
  it('renders children', ({ queryByText }, props, expectResult) => {
    expectResult(queryByText('children')).toBeInTheDocument();
  });
  it('renders prefix', ({ queryByText }, props, expectResult) => {
    expectResult(queryByText('Prefix')).toBeInTheDocument();
  });
  it('renders cross', ({ queryByLabelText }, props, expectResult) => {
    expectResult(queryByLabelText('remove')).toBeInTheDocument();
  });
});

const Test = (props: PropsBase<Props, Names>) => (
  <TestBase<Names, Props> component={Badge} tests={tests} {...props} />
);

runTests(
  <Test
    label={'Badge'}
    props={{ children: 'children' }}
    expectedResults={{
      'renders children': yes,
      'renders prefix': no,
      'renders cross': no
    }}
    beforeAll={() => {
      mockAllProviderHooks();
    }}
  >
    {(props, expectedResults) => (
      <>
        <Test
          label={'with prefix'}
          props={{ ...props, prefix: 'Prefix' }}
          expectedResults={{ ...expectedResults, 'renders prefix': yes }}
        />
        <Test
          label={'with cross click handler'}
          props={{ ...props, onCrossClick: () => undefined }}
          expectedResults={{ ...expectedResults, 'renders cross': yes }}
        />
      </>
    )}
  </Test>
);
