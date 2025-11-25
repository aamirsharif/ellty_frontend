const state = {
    pages: [
        { id: 'page1', label: 'Page 1', checked: false },
        { id: 'page2', label: 'Page 2', checked: false },
        { id: 'page3', label: 'Page 3', checked: false },
        { id: 'page4', label: 'Page 4', checked: false },
    ]
};

const allPagesRow = document.getElementById('all-pages-row');
const allPagesCheckbox = document.getElementById('all-pages-checkbox');
const pagesList = document.getElementById('pages-list');
const doneBtn = document.getElementById('done-btn');

function renderCheckbox(element, isChecked) {
    const icon = element.querySelector('svg');
    const shadow = element.querySelector('.shadow-overlay');
    
    if (isChecked) {
        element.className = "checkbox-box relative w-[23px] h-[23px] rounded-[6px] flex items-center justify-center border bg-[#2469F6] border-[#2469F6] hover:bg-[#1a5ac6] hover:border-[#1a5ac6]";
        icon.setAttribute('class', 'check-icon text-white opacity-100');
        if(shadow) shadow.style.display = 'none';
    } else {
        element.className = "checkbox-box relative w-[23px] h-[23px] rounded-[6px] flex items-center justify-center border bg-white border-[#D1D1D1] group-hover:border-[#BDBDBD]";
        icon.setAttribute('class', 'check-icon text-[#E3E3E3] opacity-0 group-hover:opacity-100');
        if(shadow) shadow.style.display = 'block';
    }
}

function renderList() {
    pagesList.innerHTML = ''; 

    state.pages.forEach(page => {
        const row = document.createElement('div');
        row.className = "flex items-center justify-between py-[2px] px-1 cursor-pointer group select-none";
        row.onclick = () => togglePage(page.id);

        const label = document.createElement('span');
        label.className = "text-[#424242] text-[16px] font-normal";
        label.textContent = page.label;

        const checkbox = document.createElement('div');
        checkbox.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <div class="shadow-overlay absolute inset-0 rounded-[6px] pointer-events-none shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.02)]"></div>
        `;
        
        renderCheckbox(checkbox, page.checked);
        
        row.appendChild(label);
        row.appendChild(checkbox);
        pagesList.appendChild(row);
    });

    updateAllPagesCheckbox();
}

function updateAllPagesCheckbox() {
    const allChecked = state.pages.length > 0 && state.pages.every(p => p.checked);
    renderCheckbox(allPagesCheckbox, allChecked);
}

function toggleAll() {
    const allChecked = state.pages.length > 0 && state.pages.every(p => p.checked);
    const newState = !allChecked;
    
    state.pages = state.pages.map(p => ({ ...p, checked: newState }));
    renderList();
}

function togglePage(id) {
    state.pages = state.pages.map(p => 
        p.id === id ? { ...p, checked: !p.checked } : p
    );
    renderList();
}

allPagesRow.addEventListener('click', toggleAll);

doneBtn.addEventListener('click', () => {
    console.log('Done clicked', state.pages);
});

renderList();
