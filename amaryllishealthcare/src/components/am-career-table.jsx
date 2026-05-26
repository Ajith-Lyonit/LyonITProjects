export const AMCareerTable = ({item,index}) =>{
    return(
        <div className="am-career-table ps-2">
            <p>{index+1+"."+" "}{item.AMD_Position}</p>
            <p>{item.AMD_Locations.split(',').join(' | ')}</p>
        </div>
    )
}