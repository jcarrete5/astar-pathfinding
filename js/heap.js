function Heap(comparator) {
    this.data = [null];
    this.comparator = comparator;
    
    this.insert = function(item) {
        this.data.push(item);
        var childIndex = this.data.length - 1;
        var parentIndex = floor(childIndex / 2);
        while(parentIndex > 0 && comparator(this.data[childIndex], this.data[parentIndex]) > 0) {
            var tmp = this.data[parentIndex];
            this.data[parentIndex] = this.data[childIndex];
            this.data[childIndex] = tmp;
            
            childIndex = parentIndex;
            parentIndex = floor(parentIndex / 2);
        }
    };
    
    this.extract = function() {
        var ret = this.data[1];
        var parentIndex = 1;
        var childIndex = parentIndex * 2;
        this.data[1] = this.data[this.data.length - 1];
        this.data.splice(this.data.length - 1, 1);
        while(childIndex < this.data.length) {
            var comp = childIndex;
            if(childIndex + 1 < this.data.length &&
              this.comparator(this.data[childIndex + 1], this.data[childIndex]) > 0) {
                comp = childIndex + 1;
            }
            
            if(this.comparator(this.data[comp], this.data[parentIndex]) > 0) {
                var tmp = this.data[parentIndex];
                this.data[parentIndex] = this.data[comp];
                this.data[comp] = tmp;
                
                parentIndex = comp;
                childIndex = parentIndex * 2;
            } else {
                break;
            }
        }
        
        return ret;
    };
    
    this.size = function() {
        return data.length;
    };
}