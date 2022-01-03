document.addEventListener("click", (e) => {
    const id = e.target?.dataset?.id || null;
    if (id) {
      fetch(`/${id}`, {
        method: "DELETE",
      }).then(() => {
        window.location.reload();
      });
    }
  });