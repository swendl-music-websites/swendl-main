const portfolioDataToShowAll = window.portfolioData;

const portfolioContainer_all = document.getElementById("portfolio-all");

portfolioDataToShowAll.forEach(item => {
    const itemHTML = `
        <div class="clapat-item ${item.date}-filter" data-startparallax="-0.2" data-endparallax="0.2">
            <div class="slide-inner" data-centerLine="LISTEN">
                <div class="img-mask">
                    <a href="${item.link}" target="_blank">
                        <div class="section-image">
                            <img src="${item.imageSrc}" class="item-image grid__item-img" alt="${item.imageAlt}" loading="lazy"/>
                        </div>
                    </a>
                </div>
                <div class="slide-caption trigger-item-link-secondary">
                    <div class="slide-title">
                        <span>${item.title}</span>
                    </div>
                    <div class="slide-date"><span>${item.date}</span></div>
                    <div class="slide-artist"><span>${item.artist}</span></div>
                    <div class="slide-icon"><i class="arrow-icon-down"></i></div>
                </div>
            </div>
        </div>
    `;
    portfolioContainer_all.insertAdjacentHTML("beforeend", itemHTML);
});