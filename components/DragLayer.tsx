import { DragLayerMonitor, useDragLayer } from 'react-dnd'
import { ItemStyled, ItemStyledProps } from './Item';

export const DragLayer = (props: ItemStyledProps) => {  
    
    const {isDragging, currentOffset, item} = useDragLayer(
      (monitor: DragLayerMonitor) => {
        return {
          isDragging: monitor.isDragging(),
          currentOffset: monitor.getSourceClientOffset(),
          item: monitor.getItem()
        };
      }
    );
		return isDragging && currentOffset
    	? <div style={{ 
    	    // functional
    	    transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
    	    position: 'fixed',
    	    top: 0,
    	    left: 0,
    	    pointerEvents: 'none', 
    	  }}>
    	      <ItemStyled {...props}>
							<span className="text">{item.value}</span>
						</ItemStyled>
    	  </div> 
    	: null;
};

