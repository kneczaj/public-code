import { withField } from '../HOC/field';
import { Textarea, BaseProps } from '../components/textarea';

export const TextareaField = withField<BaseProps, any>(Textarea);
