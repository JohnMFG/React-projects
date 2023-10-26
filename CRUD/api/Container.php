<?php

class Container {
    private $dependencies = [];

    public function __construct() {
        $this->dependencies = [];
    }

    public function register($name, $dependency) {
        $this->dependencies[$name] = $dependency;
    }

    public function resolve($name) {
        if (isset($this->dependencies[$name])) {
            return $this->dependencies[$name]();
        }
    }
}
