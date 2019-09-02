document.addEventListener("DOMContentLoaded", () => {
  const cancel = document.querySelector("#cancel");

  if (!cancel) return;

  cancel.addEventListener("click", handleClick);

  function handleClick(event) {
    fetch(`/pharmacyApp/orders/${event.target.dataset.orderId}/cancel`)
      .then(response => response.json())
      .then(json => {
        if (!json.ok) {
          alert(json.message);

          return false;
        }

        location.replace(`/pharmacyApp/orders/${json.order.id}`);
      })
      .catch(error => console.error(error.message));
  }
});
