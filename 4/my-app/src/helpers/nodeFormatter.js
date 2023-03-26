
const nodeFormatter = (array) => {



    let output = {}


    array.forEach(el => {

        if (!el.parent) {
            output['name'] = el.name
            output["children"] = []
        } else {

            if (el.parent == output.name) {
                output.children.push({ name:el.name, children: [] })
            }

            if (output.children.length) {

                output.children.forEach(elChildren => {
                    if (el.parent == elChildren.name) {
                        elChildren.children.push({ name:el.name, children: [] })
                    }


                    if (elChildren.children.length) {

                        elChildren.children.forEach(elGrandChildren => {

                            if (el.parent == elGrandChildren.name) {
                                elGrandChildren.children.push({ name:el.name, children: [] })
                            }

                        })
                    }

                })


            }
        }


    })
    return output

}

module.exports = nodeFormatter