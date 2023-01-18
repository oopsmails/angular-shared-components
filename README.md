# angular-shared-components

## Trying

using @oops/shared@"file:./oops-lib/angular-oops-shared-components-0.0.1.tgz" generated from "C:\oopsmails\001-angular-oops-lib"

```
liu@lenovo-small MINGW64 /c/oopsmails/001-angular-oops-lib (master)
$ npm run build


liu@lenovo-small MINGW64 /c/oopsmails/001-angular-oops-lib/dist/angular-oops-shared-components (master)
$ npm pack


Copy angular-oops-shared-components-0.0.1.tgz from "/c/oopsmails/001-angular-oops-lib/dist/angular-oops-shared-components" to "/c/oopsmails/08-angular-shared-components/oops-libs"

Then, in the project which will use the shared lib, do npm install

liu@lenovo-small MINGW64 /c/oopsmails/08-angular-shared-components (develop)
$ npm install ./oops-lib/angular-oops-shared-components-0.0.1.tgz

This will add following in package.json

"angular-oops-shared-components": "file:oops-lib/angular-oops-shared-components-0.0.1.tgz",

> update imports part app.module.ts to include shared module

import { AngularOopsSharedComponentsModule } from 'angular-oops-shared-components';

> use, for exampe, service in Component

import { AngularOopsSharedComponentsService } from 'angular-oops-shared-components';

private angularOopsSharedComponentsService: AngularOopsSharedComponentsService

this.angularOopsSharedComponentsService.doSomething();

```

## Errors and solutions

### Note, service only in provider part of module.ts, i.e, do not need to put in declarations or exports part

Otherwise, got "service not component, module .... errir"

### error TS2707: Generic type 'ɵɵComponentDeclaration' requires between 7 and 8 type arguments.

- ref: https://stackoverflow.com/questions/74616687/error-ts2707-generic-type-%C9%B5%C9%B5directivedeclaration-requires-between-6-and-8-type

I had the same error after running, ng update @angular/core@14 @angular/cl1@14. Some other packages were updated to v15.04 in my pacakge.json. I'm guessing these are all dependencies I should have chained to the ng update command to have them all update evenly to v14. The solution was just to downgrade the versions of all packages that were in v15 to the v14-lst.

I think that because my @angular/compiler and @angular/compiler-cli had been updated to v15 is what triggered the compilation error when running ng serve

Update:

Ran into this again after configuring all my linters. I don't think you want to lint or check on build node modules unless you really need to. Having typescript check node modules is important especially if you don't want different packages or different copies of the same package having conflicting type declarations. To solve this, under compiler options in your tsconfig.json add skipLibCheck: true

- add following in tsconfig.json,

```
{
    ...
    complilerOptions: {
        ...
        skipLibCheck: true
    }
}
```

### Specific to this

add lodash using following .... new way,

```
npm i --save-dev @types/lodash

not npm install lodash.concat

```
