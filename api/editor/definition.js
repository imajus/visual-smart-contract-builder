import { createDefinitionModel } from 'sequential-workflow-editor-model';
import {
  rootModel,
  logStepModel,
  calculateStepModel,
  convertValueStepModel,
  ifStepModel,
  loopStepModel,
} from './model';

/**
 * @type MyDefinition
 */
export const definitionModel = createDefinitionModel((model) => {
  model.valueTypes(['string', 'number']);
  model.root(rootModel);
  model.steps([
    logStepModel,
    calculateStepModel,
    convertValueStepModel,
    ifStepModel,
    loopStepModel,
  ]);
});
