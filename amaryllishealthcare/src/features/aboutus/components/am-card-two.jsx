const AMAboutCardTwo = ({ item }) => {
    const textFormat = () =>{
        return <div dangerouslySetInnerHTML={{ __html: item.itemDesc }} />
    }
    return (
            <div className="am-about-card-two">
                <div className="am-card-two-img text-center">
                    <img src={item.itemImg} className="img-fluid" style={{filter:'revert'}} alt="" />
                </div>
                <div>
                    <h6>{item.itemText}</h6>
                </div>
                <div className="am-card-description">
                     {textFormat(item.itemDesc)}
                </div>
            </div>
    )
}

export default AMAboutCardTwo