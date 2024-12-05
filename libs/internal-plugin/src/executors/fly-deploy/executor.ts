import { PromiseExecutor } from '@nx/devkit';
import { FlyDeployExecutorSchema } from './schema';
import { execSync } from 'child_process';

const runExecutor: PromiseExecutor<FlyDeployExecutorSchema> = async (options) => {
  const cwd = options.distLocation;
  const results = execSync(`/Users/keelan/.fly/bin/flyctl apps list`);
  try {
    if (results.toString().includes(options.flyAppName)) {
      execSync(`/Users/keelan/.fly/bin/flyctl deploy`, { cwd, stdio: 'inherit' });
    } else {
      // consult https://fly.io/docs/reference/regions/ to get best region for you
      execSync(`/Users/keelan/.fly/bin/flyctl launch --now --name=${options.flyAppName} --yes --copy-config --region=lax`, {
        cwd,
        stdio: 'inherit',
      });
    }
    return { success: true };
  } catch (error) {
    console.error('Deployment failed:', error);
    return { success: false };
  }
};

export default runExecutor;