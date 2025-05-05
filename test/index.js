import { BoxDIContainer, ReflectDIContainer } from '../pkg/wasm_di.js';
import { createContainer, asValue } from 'awilix';

const boxContainer = new BoxDIContainer();
const reflectContainer = new ReflectDIContainer();

const awilixContainer = createContainer();

const library = { add: (a, b) => a + b };

boxContainer.register('add', library.add);
reflectContainer.register('add', library.add);
awilixContainer.register({
  add: asValue(library.add),
});

const boxAdd = boxContainer.resolve('add');
const reflectAdd = reflectContainer.resolve('add');
const awilixAdd = awilixContainer.resolve('add');

const boxStartTime = performance.now();
for (let i = 0; i < 1000000; i++) {
  boxContainer.resolve('add');
}
const boxEndTime = performance.now();

const reflectStartTime = performance.now();
for (let i = 0; i < 1000000; i++) {
  reflectContainer.resolve('add');
}
const reflectEndTime = performance.now();

const awilixStartTime = performance.now();
for (let i = 0; i < 1000000; i++) {
  awilixContainer.resolve('add');
}
const awilixEndTime = performance.now();

console.log('BoxDIContainer dependency resolution performance: ', (boxEndTime - boxStartTime).toFixed(2), 'ms');
console.log('ReflectDIContainer dependency resolution performance: ', (reflectEndTime - reflectStartTime).toFixed(2), 'ms');
console.log('Awilix dependency resolution performance: ', (awilixEndTime - awilixStartTime).toFixed(2), 'ms');

console.log('BoxDIContainer add result:', boxAdd(1, 2));
console.log('ReflectDIContainer add result:', reflectAdd(1, 2));
console.log('Awilix add result:', awilixAdd(1, 2));
