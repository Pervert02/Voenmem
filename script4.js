let currentId = 0;
const loadMore = () => {
    if (currentId >= 100) {
        return;
    }
    const loading = document.getElementById('loading');
    loading.style.display = 'block';
    setTimeout(() => {
        fetch('https://raw.githubusercontent.com/Pervert02/Voenmem/main/1.json')
            .then(response => response.json())
            .then(data => {
                const content = document.getElementById('content');
                for (let i = 0; i < 10; i++) {
                    if (currentId >= 100) {
                        break;
                    }
                    const item = data[currentId];
                    const div = document.createElement('div');
                    const number = document.createElement('h1');
                    const title = document.createElement('h2');
                    const body = document.createElement('p');
                    number.textContent = currentId + 1;
                    title.textContent = item.title;
                    body.textContent = item.body;
                    div.appendChild(number);
                    div.appendChild(title);
                    div.appendChild(body);
                    content.appendChild(div);
                    currentId++;
                }
                if (currentId % 10 === 0 && currentId < 100) {
                    const lastBlock = content.lastChild;
                    const observer = new IntersectionObserver((entries) => {
                        if (entries[0].isIntersecting) {
                            observer.disconnect();
                            loadMore();
                        }
                    }, {});
                    observer.observe(lastBlock);
                }
                loading.style.display = 'none';
            });
    }, 1000);
};

loadMore();