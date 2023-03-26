const fs = require("fs")

function generateTree(array) {

    let output = {}


    array.forEach(el => {

        if (!el.parent) {
            output["label"] = el.label

            output["children"] = []
        } else {

            if (el.parent == output.label) {
                output.children.push({  label: el.label, children: [] })
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
    return fs.writeFileSync("./generateedTree.json", JSON.stringify(output, "utf-8", 3))

}



function flattenTree(tree) {
    let output = []

    output.push({ label: tree.label, parent: null })

    if (tree.children.length) {
        let rootParent = output[0].label
        tree.children.forEach(elChildren => {
            output.push({ label: elChildren.label, parent: rootParent })

            if (elChildren.children.length) {
                let children = elChildren.label
                elChildren.children.forEach(elGrandChildren => {
                    output.push({ label: elGrandChildren.label, parent: children })


                    if (elGrandChildren.children.length) {
                        let GrandChildren = elGrandChildren.label
                        elGrandChildren.children.forEach(elGrand2Children => {
                            output.push({ label: elGrand2Children.label, parent: GrandChildren })

                        })
                    }

                })
            }

        })
    }


    return output
}

function main() {
    generateTree([
        { "label": 1, "parent": null },
        { "label": 2, "parent": 1 },
        { "label": 3, "parent": 2 },
        { "label": 4, "parent": 2 },
        { "label": 5, "parent": 1 },
        { "label": 6, "parent": 1 },
        { "label": 7, "parent": 6 },
        { "label": 8, "parent": 6 },
        { "label": 9, "parent": 8 }
    ])

    let generatedTree = JSON.parse(fs.readFileSync("./generateedTree.json"))

    let output = flattenTree(generatedTree)

    return fs.writeFileSync("./flattenTree.json", JSON.stringify(output, "utf-8", 3))
}

main()