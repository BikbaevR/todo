export const getTypeNameViaId = (typeId, taskTypes) => {
    for(let typeObj of taskTypes){
        if(typeObj.id === typeId){
            return typeObj.typeName;
        }
    }
    return 'не найдено'
}