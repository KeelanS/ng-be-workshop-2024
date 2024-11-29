# `📖 Excercise:` Local plugins and custom generators

## 📚&nbsp;&nbsp;**Learning outcomes**
- Understand what an internal plugin is
- Understanding generators in internal plugin, including:
  - How to create them
  - How to invoke them
  - How to use one to simplify usages of other, more powerful generators

## 🏋️‍♀️&nbsp;&nbsp;Steps:

### 1. Add @nx/plugin
  
Add the `@nx/plugin` plugin with `nx add`.

<details>
  <summary>🐳&nbsp;&nbsp;Hint</summary>

    ```bash
    npx nx add @nx/plugin
    ```
</details>

## 2. Generate Plugin
Generate a new plugin called `internal-plugin` in the `libs` directory. This step initializes the necessary setup for your custom generator.

<details>
  <summary>🐳&nbsp;&nbsp;Hint</summary>

    ```bash
    nx generate @nx/plugin:plugin libs/internal-plugin
    ```
</details>

## 3. Generate a generator
Use the `@nx/plugin:generator` generator to generate a new generator called `util-lib`. Inspect the files that got generated and then commit everything. 

<details>
  <summary>🐳&nbsp;&nbsp;Hint</summary>

  Run `npx nx list` to see your newly created plugin in the list of installed plugins.
  Run `npx nx list @nx-workshop/internal-plugin` to see our generator details.
</details>

⚠️&nbsp;&nbsp;Commit your changes! 

## 4. Run your generator
Try to run your generator to see what changes are being made (you can append `--dry-run` to avoid reverting using Git).

⚠️&nbsp;&nbsp;The code we generated creates a very bare-bones new library. You can use Git to undo those changes (hence why it's recommended to commit before running a generator).

## 5. Extend other generators
We can call other generators inside of our custom generator. Import the `@nx/js:library` generator and call it inside of the default exported function of `libs/internal-plugin/src/generators/util-lib/generator.ts`

<details>
<summary>🐳&nbsp;&nbsp;Hint</summary>

```typescript
import { libraryGenerator } from '@nx/js/generators';

export default async function (tree: Tree, schema: UtilLibGeneratorSchema) {
  await libraryGenerator(tree, schema);
  // ...
}
```

</details>

## 6. Console log the properties
In `libs/internal-plugin/src/generators/util-lib/generator.ts` try to make it `console.log()` the value of the `--name` property you passed to it (can use `--dry-run` again to test it)

## 7. Add prefix
The generator should prefix any name you give to your lib with `util-`. For example:

- `nx generate @nx-workshop/internal-plugin:util-lib dates`
- Should generate a lib with the name `util-dates`

⚠️&nbsp;&nbsp;You can keep trying out your changes safely with the `--dry-run` flag.️

## 7. Add directory

Add a new property to its schema called `directory`. It should have only 3 possible values:
`"movies", "api", "shared"`. If you do not pass `--directory` as an option when invoking the
schema it should prompt the user to select from the 3 different values (similar to when you got
asked about which bundler to use when creating libs). The generator should generate the lib in the directory you pass to it.

<details>
<summary>🐳&nbsp;&nbsp;Hint</summary>

[Adding dynamic prompts](https://nx.dev/recipes/generators/generator-options#adding-dynamic-prompts)

</details>
<br />

## 8. Add tags
Because it's a `util` lib, it should automatically be generated with the `type:util` tags. We also need to add `scope` tag to it. We can use the `directory` value for this, since it signifies our scope e.g. `scope:movies`.

<details>
<summary>🐳&nbsp;&nbsp;Hint</summary>

Consult the `@nx/js:lib` [docs](https://nx.dev/packages/js/generators/library)
for possible options you can pass to it.

</details>

⚠️&nbsp;&nbsp;Before testing your changes, remember to commit them, in case you need to revert
    locally generated files again.

## 9. Add a bit of logic
Let's add some functionality to the lib you just created:

- In `libs/api/util-notifications/src/lib/api-util-notifications.ts`
- Add:
  ```typescript
  export function sendNotification(clientId: string) {
    console.log('sending notification to client: ', clientId);
  }
  ```

Now try to import the above function in `apps/movies-api/src/main.ts`
- Try to lint all the apps
- It should work because everything is in the `api` scope

Try to import it in `apps/movies-app/src/app/app.component.ts`
- It should fail because it's not within the same scope

## 10. Conclusion

You learned how to generate plugis and create your own generators. In the next step we will learn how to build even more complex generators.

⚠️&nbsp;&nbsp;Don't forget to commit everything before you move on.

## [➡️ Next lab ➡️](./complex-generators.md)