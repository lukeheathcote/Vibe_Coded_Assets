/*
  ======================================================================================
  LAYER CORNER LOG PRO (V5 - Ordered)
  --------------------------------------------------------------------------------------
  FUNCTION: 
  Records world-space coordinates in the specific order:
  1. Top Left
  2. Top Right
  3. Bottom Left
  4. Bottom Right
  METHOD:
  Uses temporary expression evaluation for 100% accuracy with 3D/Parented layers.
  ======================================================================================
*/

(function() {
    var win = new Window("palette", "Corner Logger V5", undefined);
    win.orientation = "column";
    win.alignChildren = ["fill", "top"];
    win.spacing = 10;
    win.margins = 15;

    var btnAdd = win.add("button", undefined, "Log Selected Layers");
    var btnClear = win.add("button", undefined, "Clear List");
    
    var outputList = win.add("edittext", undefined, "", {multiline: true, scrollable: true});
    outputList.preferredSize = [380, 500];

    btnAdd.onClick = function() {
        var curComp = app.project.activeItem;

        if (!curComp || !(curComp instanceof CompItem)) {
            alert("Please select the Timeline/Comp window first.");
            return;
        }

        var sel = curComp.selectedLayers;
        if (sel.length === 0) {
            alert("No layers selected.");
            return;
        }

        var newEntries = "";

        for (var i = 0; i < sel.length; i++) {
            var layer = sel[i];
            
            try {
                var w = layer.width;
                var h = layer.height;

                // Function to evaluate coordinates via the Expression Engine
                function getPoint(pt) {
                    var transform = layer.property("ADBE Transform Group");
                    var posProp = transform.property("ADBE Position");
                    
                    // Store existing expression to restore it later
                    var oldExpr = posProp.expression;
                    
                    posProp.expression = 'thisLayer.toComp([' + pt[0] + ',' + pt[1] + '])';
                    var val = posProp.valueAtTime(curComp.time, false);
                    
                    posProp.expression = oldExpr; // Restore original state
                    return val;
                }

                // Get corners in the specific requested order
                var tl = getPoint([0, 0]);
                var tr = getPoint([w, 0]);
                var bl = getPoint([0, h]);
                var br = getPoint([w, h]);

                newEntries += "NAME: " + layer.name + "\n";
                newEntries += "1. Top Left:     [" + tl[0].toFixed(1) + ", " + tl[1].toFixed(1) + "]\n";
                newEntries += "2. Top Right:    [" + tr[0].toFixed(1) + ", " + tr[1].toFixed(1) + "]\n";
                newEntries += "3. Bottom Left:  [" + bl[0].toFixed(1) + ", " + bl[1].toFixed(1) + "]\n";
                newEntries += "4. Bottom Right: [" + br[0].toFixed(1) + ", " + br[1].toFixed(1) + "]\n";
                newEntries += "------------------------------------------\n";

            } catch (err) {
                newEntries += "FAILED: " + layer.name + " (Layer might be locked or missing Position)\n";
            }
        }

        outputList.text = outputList.text + newEntries;
    };

    btnClear.onClick = function() {
        outputList.text = "";
    };

    win.center();
    win.show();
})();