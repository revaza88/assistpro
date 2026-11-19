import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

test('shared validation works without attempting string code generation under strict CSP', () => {
  const script = `
    import assert from 'node:assert/strict';
    let attempts = 0;
    globalThis.Function = new Proxy(Function, {
      construct() { attempts++; throw new EvalError('QA strict CSP'); },
      apply() { attempts++; throw new EvalError('QA strict CSP'); }
    });
    const { calculatorInputSchema, calculateDemoEstimate } = await import('./src/shared/pricing.ts');
    const { insertContactSchema } = await import('./src/shared/schemas.ts');
    const input = {industry:'service',documents:100,employees:5,vat:false,type:'monthly'};
    assert.equal(calculatorInputSchema.safeParse(input).success,true);
    assert.equal(calculatorInputSchema.safeParse({...input,employees:-1}).success,false);
    assert.equal(calculateDemoEstimate(input).low,340);
    assert.equal(insertContactSchema.safeParse({name:'QA',contact:'invalid',privacy:true}).success,false);
    assert.equal(attempts,0,'Validation must not attempt eval or new Function');
  `;
  const result = spawnSync(process.execPath, ['--import', 'tsx', '--input-type=module', '--eval', script], { encoding: 'utf8', timeout: 30000 });
  assert.equal(result.status, 0, result.stderr || result.error?.message);
});
