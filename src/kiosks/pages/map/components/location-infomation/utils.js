export const responsiveOptions = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];

const DEFAULT_IMG = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png';
export const itemTemplate = (item) => {
    return <div >
        <img src={item.itemImageSrc}
            onError={(e) => e.target.src = DEFAULT_IMG}
            style={{ width: '473px', height: '300px', display: 'block' }}
        />
    </div>;
}

export const thumbnailTemplate = (item) => {
    return <div style={{ marginTop: 15 }}>
        <img src={item.thumbnailImageSrc} onError={(e) => e.target.src = DEFAULT_IMG}
            style={{ width: 20, height: 20, display: 'block' }}
        />
    </div>
}

export const prepareGallery = (obj) => {
    let tempImgs = [];
    if (obj.thumbnail) {
        tempImgs.push({
            itemImageSrc: obj.thumbnail.link,
            thumbnailImageSrc: obj.thumbnail.link
        })
    }
    if (obj.listImage) {
        obj.listImage.map((e) => {
            tempImgs.push({
                itemImageSrc: e.link,
                thumbnailImageSrc: e.link
            })
        })
    }
    return tempImgs;
}
export const TagStyle = {
    padding: 5,
    fontWeight: 'bold',
    fontSize: 18
}