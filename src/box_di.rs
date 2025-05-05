// Pure Rust memory (no JS heap)
use std::collections::HashMap;
use wasm_bindgen::prelude::*;
use js_sys::Function;

#[wasm_bindgen]
pub struct BoxDIContainer {
    deps: Box<HashMap<String, Function>>,
}

#[wasm_bindgen]
impl BoxDIContainer {
    #[wasm_bindgen(constructor)]
    pub fn new() -> BoxDIContainer {
        BoxDIContainer {
            deps: Box::new(HashMap::new()),
        }
    }

    pub fn register(&mut self, name: String, func: Function) {
        self.deps.insert(name, func);
    }

    pub fn resolve(&self, name: String) -> Option<Function> {
        self.deps.get(&name).cloned()
    }
}
