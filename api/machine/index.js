import {
  // WorkflowMachineSnapshot,
  createWorkflowMachineBuilder,
} from 'sequential-workflow-machine';
// import { GlobalState } from './global-state';
import { activitySet } from './activities';
// import { MyDefinition } from '../model/definition-model';
// import {
//   VariableState,
//   VariablesService,
//   createVariableState,
// } from './services/variables';
// import { DynamicsService } from './services/dynamics';
import { LoggerService } from './services/logger';

const builder = createWorkflowMachineBuilder(/* <GlobalState> */ activitySet);

export function executeMachine(
  definition /* : MyDefinition */,
  variableValues /* : VariableState */,
  onStateChanged /* : (path : string[]) => void */,
  onLog /* : (message: string ) => void */,
) /* : Promise<WorkflowMachineSnapshot<GlobalState>> */ {
  const machine = builder.build(definition);
  const interpreter = machine.create({
    init: () => {
      // const variablesState = createVariableState(variableValues);
      // const $variables = new VariablesService(variablesState);
      // const $dynamics = new DynamicsService($variables);
      const $logger = new LoggerService();
      $logger.onLog.subscribe(onLog);
      return {
        startTime: new Date(),
        // variablesState,
        // $variables,
        // $dynamics,
        $logger,
      };
    },
  });

  return new Promise((resolve, reject) => {
    try {
      interpreter.onChange(() => {
        const snapshot = interpreter.getSnapshot();
        onStateChanged(snapshot.getStatePath());
      });
      interpreter.onDone(() => {
        resolve(interpreter.getSnapshot());
      });
      interpreter.start();
    } catch (e) {
      reject(e);
    }
  });
}
