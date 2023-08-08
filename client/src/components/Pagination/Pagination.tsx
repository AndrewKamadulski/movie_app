

export const Pagination:React.FC<{pageNumber: number, setPageNumber: React.Dispatch<React.SetStateAction<number>>}> = (props) => {
    const {pageNumber, setPageNumber} = props;

   
const handlePageChange = (event) => {
    
        if(event.target.value >= 1 && event.target.value <= 500) {
            setPageNumber(parseInt(event.target.value));
           
        }
}


return(
<nav aria-label="...">
<ul className='pagination py-3'>
    <li className='page-item'>
        <button className='page-link'
         onClick={ () => setPageNumber(1)}
        >
            First 
        </button>
    </li>
    <li className='page-item'>
        <button className='page-link bi-arrow-left-square'
        onClick={ () => pageNumber > 1 ? setPageNumber(pageNumber-1) : "" }> 
        </button>
    </li>
   
        <li>
                <button className='page-link'> 
                Page {pageNumber}                
                </button>
                <input type="text" 
                value={pageNumber} maxLength={3} onChange={(event)=>handlePageChange(event)}
                 style={{width:80}}></input>
        </li>
        <li className='page-item'>
        <button className='page-link bi-arrow-right-square'
         onClick={ () => pageNumber < 500 ?setPageNumber(pageNumber+1) : ""}>
        </button>
    </li>
        
    
    <li className='page-item'>
        <button className='page-link'
         onClick={ () => setPageNumber(500)}>
            Last 
        </button>
    </li>
</ul>
</nav>
)}