const container = document.querySelector(".items");
const items = document.querySelectorAll(".item");

let selectedItem = null;
let offsetX = 0;
let offsetY = 0;

const cubeWidth = 120;
const cubeHeight = 120;
const gap = 20;

function arrangeItems() {
  const columns = Math.max(
    1,
    Math.floor(
      (container.clientWidth - gap) / (cubeWidth + gap)
    )
  );

  items.forEach((item, index) => {
    const row = Math.floor(index / columns);
    const column = index % columns;

    item.style.left = `${gap + column * (cubeWidth + gap)}px`;
    item.style.top = `${gap + row * (cubeHeight + gap)}px`;
  });
}

arrangeItems();

items.forEach((item) => {
  item.addEventListener("mousedown", (e) => {
    selectedItem = item;

    const itemRect = item.getBoundingClientRect();

    offsetX = e.clientX - itemRect.left;
    offsetY = e.clientY - itemRect.top;

    item.style.zIndex = "1000";
    item.style.cursor = "grabbing";

    container.classList.add("active");

    e.preventDefault();
  });
});

document.addEventListener("mousemove", (e) => {
  if (!selectedItem) return;

  const containerRect = container.getBoundingClientRect();

  let left =
    e.clientX - containerRect.left - offsetX;

  let top =
    e.clientY - containerRect.top - offsetY;

  const maxLeft =
    container.clientWidth - selectedItem.offsetWidth;

  const maxTop =
    container.clientHeight - selectedItem.offsetHeight;

  left = Math.max(0, Math.min(left, maxLeft));
  top = Math.max(0, Math.min(top, maxTop));

  selectedItem.style.left = `${left}px`;
  selectedItem.style.top = `${top}px`;
});

document.addEventListener("mouseup", () => {
  if (!selectedItem) return;

  selectedItem.style.cursor = "grab";
  selectedItem.style.zIndex = "1";

  selectedItem = null;

  container.classList.remove("active");
});