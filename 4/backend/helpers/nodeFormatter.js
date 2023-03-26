
const nodeFormatter = (array) => {



    let output = {}


    array.forEach(el => {

        if (!el.parent) {
            output["label"] = el.label

            output["children"] = []
        } else {

            if (el.parent == output.label) {
                output.children.push({ label: el.label, children: [] })
            }

            if (output.children.length) {

                output.children.forEach(elChildren => {
                    if (el.parent == elChildren.label) {
                        elChildren.children.push({ label: el.label, children: [] })
                    }


                    if (elChildren.children.length) {

                        elChildren.children.forEach(elGrandChildren => {

                            if (el.parent == elGrandChildren.label) {
                                elGrandChildren.children.push({ label: el.label, children: [] })
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