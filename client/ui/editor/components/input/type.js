import SimpleSchema from 'simpl-schema';
import { TemplateController } from 'meteor/space:template-controller';
import './type.html';

TemplateController('EditorTypeInput', {
  props: new SimpleSchema(
    {
      'name': String,
      'value': String,
      'eventChange': String,
      'eventChangeData': String,
    },
    {
      requiredByDefault: false,
    },
  ),
  helpers: {
    types: () => [
      'string',
      'boolean',
      'address',
      'uint256',
      'mapping(address => uint256)',
    ],
    typeAtts(type) {
      const { value } = this.props;
      if (value === type) {
        return { selected: true };
      }
      return {};
    },
  },
  events: {
    'change'(e) {
      const { name, eventChange, eventChangeData } = this.props;
      const { value } = e.target;
      if (eventChange) {
        this.triggerEvent(eventChange, { ...eventChangeData, name, value });
      }
    },
  },
});
