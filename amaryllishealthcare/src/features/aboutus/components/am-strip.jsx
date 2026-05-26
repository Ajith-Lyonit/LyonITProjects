const AMABoutStrip = ({item}) =>{
    return(
        <div className="am-about-strip-card">
            <img src={item.itemImg} className="img-fluid" alt="" />
            <div className="am-about-strip-cont">
            <h4><strong>{item.itemText}</strong></h4>
            <p>{item.itemDesc}</p>
            </div>
        </div>
    )
}

export default AMABoutStrip;