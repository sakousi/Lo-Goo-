import Culture from "./Culture";
import Describe from "./Describe";
import Draw from "./Draw";
import Guess from "./Guess";

function RenderRound(props){
    const {round} = props;

    if(round === 1){
        return(
            <Guess />
        )
    }else if(round === 2){
        return(
            <Draw />
        )
    }else if(round === 3){
        return(
            <Describe />
        )
    }else{
        return(
            <Culture />
        )
    }
}
export default RenderRound;