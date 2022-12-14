import { DragLayerMonitor, useDragLayer } from 'react-dnd'
import { ItemStyled, ItemStyledProps } from './Item';

interface DragLayerProps extends ItemStyledProps {
	isDragging: boolean;
}

export const DragLayer = (props: DragLayerProps) => {  
    
    const {isDragging, currentOffset, item} = useDragLayer(
      (monitor: DragLayerMonitor) => {
        return {
          isDragging: monitor.isDragging(),
          currentOffset: monitor.getSourceClientOffset(),
          item: monitor.getItem()
        };
      }
    );
		return  isDragging && props.isDragging && currentOffset
    	? <div style={{ 
    	    // functional
    	    transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
    	    position: 'fixed',
    	    top: 0,
    	    left: 0,
    	    pointerEvents: 'none', 
					zIndex: 5,
    	  }}>
    	      <ItemStyled {...props}>
							<span className="text">{item.value}</span>
						</ItemStyled>
    	  </div> 
    	: null;
};

