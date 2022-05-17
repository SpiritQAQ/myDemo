class Animal {
  private name: string: ''

  public static getUltimateAnswer() : number {
    return 42
  }

  public getName() : string {
    return this.name
  }

  public setName(name: string) : void {
    this.name = name
  }
}

class Cat extends Animal {
  public getName(): string {
    return '[Cat]' + super.getName()
  }
}