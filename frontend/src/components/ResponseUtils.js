//
// Team: Team 47
// City: Melbourne
// Xiaoyu Wu (1218098)    
// Yifei Yang (1136477)
// Rui Chen (1100500)
// Wenhai Huo (1101297)
// Jingyuan Ma (988014)
//

function getCount(insData){
    return (insData.properties.count);
}

function getRegionName(insData){
    return (insData.properties.region_name);
}

function getRadius(insData){
    return (insData.properties.radius);
}

function getCountRange(source, colors) {
    phvals = source.features.map(f => f.properties.count);
    min = Math.min(...phvals);
    max = Math.max(...phvals);
    range = max-min;

    var iter = 0;
    var colorClasses = [];
    var len = colors.length;
    colors.forEach(element => {
        iter += 1;
        colorClasses.push(min+(iter/len)*range)
        colorClasses.push(element)
    });

    retun (colorClasses);
}