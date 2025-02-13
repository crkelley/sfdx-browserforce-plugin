import assert from 'assert';
import * as child from 'child_process';
import * as path from 'path';
import { Communities } from '.';

describe.skip(Communities.name, function() {
  this.slow('30s');
  this.timeout('2m');
  it('should enable', () => {
    const enableCmd = child.spawnSync(path.resolve('bin', 'run'), [
      'browserforce:apply',
      '-f',
      path.resolve(path.join(__dirname, 'enable.json'))
    ]);
    assert.deepStrictEqual(enableCmd.status, 0, enableCmd.output.toString());
    assert.ok(
      /to 'true'/.test(enableCmd.output.toString()),
      enableCmd.output.toString()
    );
  });
  it('should fail to disable', () => {
    const disableCmd = child.spawnSync(path.resolve('bin', 'run'), [
      'browserforce:apply',
      '-f',
      path.resolve(path.join(__dirname, 'disable.json'))
    ]);
    assert.deepStrictEqual(disableCmd.status, 1, disableCmd.output.toString());
    assert.ok(
      /to 'false'/.test(disableCmd.output.toString()),
      disableCmd.output.toString()
    );
    assert.ok(
      /cannot be disabled/.test(disableCmd.output.toString()),
      disableCmd.output.toString()
    );
  });
});
