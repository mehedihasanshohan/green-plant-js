const treesContainer = document.getElementById('trees-container');
const categoriesContainer = document.getElementById('Categories-container');
const cartContainer = document.getElementById('cart-container');

let cart = [];

const loadCategorys = () => {
  const url = 'https://openapi.programming-hero.com/api/categories';
    fetch(url)
    .then(res => res.json())
    .then(data => {
      displayCategories(data.categories)
    })
    .catch(error => console.error('Error fetching categories:', error));
}

const displayCategories = categories => {
  // console.log(categories);
    categoriesContainer.innerHTML = '';

    // Add "All Trees" manually as the first category
    const allCategoryItem = document.createElement('li');
    allCategoryItem.classList.add('category', 'm-4', 'cursor-pointer', 'text-md', 'font-md', 'text-black', 'hover:bg-green-500', 'hover:p-2', 'hover:rounded-lg');
    allCategoryItem.id = 'all';
    allCategoryItem.textContent = 'All Trees';
    categoriesContainer.appendChild(allCategoryItem);

    categories.forEach(category => {
      // console.log(category.id);
        const categoryItem = document.createElement('li');
        categoryItem.classList.add('category');
        categoryItem.innerHTML = `
        <li id=${category.id} class="m-4 cursor-pointer text-md font-md text-black hover:bg-green-500 hover:p-2 hover:rounded-lg">${category.category_name}
         </li>
        `;
        categoriesContainer.appendChild(categoryItem);
    });

        // Set default active category
    document.getElementById('all').classList.add('bg-green-500', 'p-2', 'rounded-lg', 'text-white');
    loadTreesByCategory('all');

    // active category
    categoriesContainer.addEventListener('click', (e) => {
      // remove indicator from all categorys
      const allLi = document.querySelectorAll('li');
      allLi.forEach(li => {
        li.classList.remove('bg-green-500', 'p-2', 'rounded-lg', 'text-white');
      });
      // add indicator to the clicked category
      if (e.target.localName === 'li') {
        showLoading();
        e.target.classList.add('bg-green-500', 'p-2', 'rounded-lg', 'text-white');
        loadTreesByCategory(e.target.id);
        // console.log(e.target.id);
      }
   });
}

const loadTreesByCategory = (categoryId) => {
  let url = `https://openapi.programming-hero.com/api/category/${categoryId}`;

  if (categoryId === 'plants' || categoryId ==='all') {
    url = 'https://openapi.programming-hero.com/api/plants'
  }
  else{
    url = `https://openapi.programming-hero.com/api/category/${categoryId}`;
  }
    fetch(url)
        .then(res => res.json())
        .then(data => displayTreesByCategory(data.plants))
        .catch(error => {
          showError(error);
        });
}


const displayTreesByCategory = (trees) => {
  treesContainer.innerHTML = '';

  trees.forEach(tree => {
    const treeItem = document.createElement('div');
    treeItem.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow-md', 'flex', 'flex-col', 'justify-between', 'h-[480px]', 'hover:shadow-xl', 'transition-shadow', 'duration-300'); // Added fixed height and hover shadow

    treeItem.setAttribute("data-id", tree.id);
    treeItem.setAttribute("data-name", tree.name);
    treeItem.setAttribute("data-price", tree.price);

    treeItem.innerHTML = `
      <div class="flex flex-col h-full">
        <img  onclick="openModal(${tree.id})" src="${tree.image}" alt="Tree image" class="title w-full h-40 object-cover rounded-md mb-4"/>
        <h4 class="tree-name cursor-pointer text-xl font-bold mb-2">${tree.name}</h4>
        <p class="text-sm font-normal mb-2 text-gray-500 flex-grow">${tree.description}</p>
        <div class="flex justify-between items-center mb-4">
          <p class="bg-green-100 text-green-700 py-1 px-3 rounded-full text-xs font-semibold">${tree.category}</p>
          <p class="text-black font-bold text-lg">$${tree.price}</p>
        </div>
      </div>
      <button class="add-to-cart w-full bg-[#15803D] hover:bg-green-800 cursor-pointer text-white font-semibold py-3 px-4 rounded-xl hover:bg-[#166534] transition-colors duration-300 mt-auto">
        Add to Cart
      </button>
    `;
    treesContainer.appendChild(treeItem);
  });
}


// modal starts
const handleDetails = (id) => {
  const modal = document.getElementById('details');
  modal.showModal();
  loadTreeDetails(id);
}

const loadTreeDetails = (id) => {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then(res => res.json())
    .then(data => {
      displayTreeDetails(data.plants);
    })
    .catch(error => console.error("Error fetching tree details:", error));
}

const displayTreeDetails = (tree) => {
  const modalBox = document.querySelector('#details .modal-box');
  modalBox.innerHTML = `
    <h3 class="text-lg font-bold">${tree.name}</h3>
    <img src="${tree.image}" alt="${tree.name}" class="w-full h-48 object-cover rounded-md my-4"/>
    <p class="text-gray-600 mb-2">${tree.description}</p>
    <div class="flex justify-between ">
    <p class="bg-green-100 text-green-700 py-1 px-3 rounded-full text-xs font-semibold">${tree.category}</p>
    <p class="font-bold text-green-700">Price: $${tree.price}</p>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Close</button>
      </form>
    </div>
  `;
}
// modal end


treesContainer.addEventListener('click', e => {
  if (e.target.classList.contains('add-to-cart')) {
    let parent = e.target.closest('div[data-id]');
    let id = parent.dataset.id;
    const name = parent.dataset.name;
    const price = parent.dataset.price;

    const exist = cart.find(item => item.id === id);
    if (exist) {
      exist.qty += 1;
    } else {
      cart.push({ id, name, price, qty: 1 });
    }

    console.log(cart);
    renderCart();
  }

  if(e.target.classList.contains('tree-name')){
    let parent = e.target.closest('div[data-id]')
    let id = parent.dataset.id;
    handleDetails(id);
  }
});

// render cart
function renderCart() {
  cartContainer.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    const div = document.createElement('div');
    div.classList.add(
      'flex',
      'justify-between',
      'items-center',
      'p-2',
      'rounded',
      'shadow-sm',
      'bg-[#DCFCE7]'
    );
    div.innerHTML = `
     <div class="flex flex-col">
    <p class="font-semibold text-gray-800">${item.name}</p>
    <div class="flex items-center gap-3 text-sm text-gray-600">
      <span>Qty: <span class="font-medium text-black">${item.qty}</span></span>
      <span class="font-medium text-green-700">Price: $${item.price * item.qty}</span>
    </div>
  </div>

  <!-- Right side (Delete Button) -->
  <button data-id="${item.id}"
    class="delete-item bg-red-500 hover:bg-red-600 cursor-pointer text-white text-sm font-bold px-3 py-1 rounded-lg shadow hover:bg-red-600 transition">
    ✕
  </button>
    `;
    cartContainer.appendChild(div);
  });

  document.getElementById('cart-total').innerText = `Total: $${total}`;
}

// Delete from Cart
cartContainer.addEventListener('click', e => {
  if (e.target.classList.contains('delete-item')) {
    const id = e.target.dataset.id;
    cart = cart.filter(item => item.id !== id);
    renderCart();
  }
});


const showLoading = () => {
  treesContainer.innerHTML = `
  <div>
    <span class="loading loading-spinner text-secondary mt-12"></span>
    <h1 class="text-3xl font-bold text-center text-red-600">Loading...</h1>
  </div>
  `
}

const showError = (error) => {
  treesContainer.innerHTML = `
  <div>

    <h1 class="text-3xl font-bold text-center text-red-600">Error: ${error}</h1>
  </div>
  `
}


loadCategorys();
loadTreesByCategory('plants'); // Load trees for the first category by default