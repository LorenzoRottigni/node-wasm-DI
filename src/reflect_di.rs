use wasm_bindgen::prelude::*;
use js_sys::{Function, Object, Reflect};

#[wasm_bindgen]
pub struct ReflectDIContainer {
    inner: Object,
}

#[wasm_bindgen]
impl ReflectDIContainer {
    #[wasm_bindgen(constructor)]
    pub fn new() -> ReflectDIContainer {
        ReflectDIContainer {
            inner: Object::new(),
        }
    }

    pub fn register(&mut self, name: &str, func: &Function) {
        Reflect::set(&self.inner, &JsValue::from_str(name), func).unwrap();
    }

    pub fn resolve(&self, name: &str) -> Option<Function> {
        Reflect::get(&self.inner, &JsValue::from_str(name))
            .ok()
            .and_then(|v| v.dyn_into::<Function>().ok())
    }
}
