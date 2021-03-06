import * as event from 'eventemitter2'
import * as Rx from 'rxjs/Rx'
import LanguageGenerator from './LanguageGenerator'

type Constructor = new(...args: any[]) => any

export default class Generator {
  options: {}

  constructor (options) {
    this.options = options
  }

  generate (event) {
    if (!this[event.type]) {
      console.error('Unknown operation:', event)
      return
    }
    return this[event.type](event)
  }

  private static generators: { [generatorName: string]: Constructor }

  static initialize () {
    this.generators = {}
  }

  static register (name: string, generator: Constructor) {
    this.generators[name] = generator
  }

  static get (name: string, opts: {}): Generator {
    const ctor = this.generators[name]
    return new ctor(opts)
  }
}

Generator.initialize()
