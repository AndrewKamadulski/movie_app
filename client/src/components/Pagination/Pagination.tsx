import { SyntheticEventData } from "react-dom/test-utils";

export const Pagination:React.FC<{pageNumber: number, setPageNumber: React.Dispatch<React.SetStateAction<number>>}> = (props) => {
    const {pageNumber, setPageNumber} = props;

    const handleKeyPress = (event) => {
        if(event.key === 'Enter' && event.target.value >=1 && event.target.value <=500){
          setPageNumber(event.target.value);
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
                Page                 
                <input onKeyPress={()=>handleKeyPress(event)} style={{width:40}}></input>
               
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