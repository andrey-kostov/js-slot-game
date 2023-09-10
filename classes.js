class Player {
    constructor(name, funds) {
      this.name = name;
      this.funds = funds;
    }
}

class SlotElement{
    constructor(name, id, icon, multiplier){
        this.name = name;
        this.id = id;
        this.icon = icon;
        this.multiplier = multiplier;
    }
}

class usedElementTimes{
    constructor(name, times, multiplier){
        this.name = name;
        this.times = times;
        this.multiplier = multiplier;
    }
}