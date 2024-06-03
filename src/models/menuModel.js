// Define a model to represent navbar tabs structure
class Menu {
    constructor(label, items) {
        this.label = label;
        this.items = items;
    }
}

class MenuItem {
    constructor(label, icon, routerLink) {
        this.label = label;
        this.icon = icon;
        this.routerLink = routerLink;
    }
}

module.exports = { Menu, MenuItem };
