import { Component } from "react";
import type { Deal } from "../types/Deal";
import GameCard from "./GameCard";

interface DealsTableProps{
 deals: Deal[] | null
}

interface DealsTableState{

}

class DealsTable extends Component<DealsTableProps, DealsTableState>{
  state = {}

  render = () => {
    const { deals } = this.props

    if (!deals){
      return <p>NO DATA</p>
    }

    return (
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {deals.map((deal: Deal) => (
          <div className="col">
             <GameCard {...deal}/> 
          </div>)
        )}
      </div>
    )
  }
}

export default DealsTable