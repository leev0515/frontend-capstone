import { MenuItems } from "./MenuItems";

function Specials() {
  const menuItems = MenuItems.map((menuItem) => {
    return (
      <div key={menuItem.id}>
        <img className="picture-menu" src={"assets/" + menuItem.img} alt="Restaurant Food" />
        <div className="grid-vertical list-item" key={menuItem.id}>
          <div className="grid-inline list-title">
            <p className="cardtitle">{menuItem.name}</p>
            <p className="text2 secondary1">{menuItem.price}</p>
          </div>
          <p className="highlight2">{menuItem.description}</p>
        </div>
      </div>
    );
  });

  return (
    <article className="grid-vertical">
      <section className="grid-inline">
        <p className="subtitle primary1">This week's specials!</p>
        <button className="actionbutton">Online Menu</button>
      </section>
      <section className="grid-inline list">
        {menuItems}
      </section>
    </article>
  );
}

export default Specials;
