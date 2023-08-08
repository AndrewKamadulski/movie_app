export const Pagination:React.FC<{pageNumber: number, setPageNumber: React.Dispatch<React.SetStateAction<number>>}> = (props) => {
    const {pageNumber, setPageNumber} = props;
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
                    
               
                <form>
                <label>
                    Page                    
                    <input className="ms-1"style={{width: 35}}type="text" placeholder={pageNumber} name="page"/>
                </label>               
                </form>
                </button>
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