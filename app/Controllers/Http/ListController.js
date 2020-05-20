'use strict'
const User = use('App/Models/User')
const List = use('App/Models/List')
const { validate } = use('Validator')

class ListController {
    async index({ auth, request }) {
        const user = auth.user;
        return await user.lists().fetch();

    }

    async read({ auth, params, response }) {
        const user = auth.user;
        if (params.id) { //USERID 
            const user = auth.user;
            const list = await List.find(params.id);

            if (list) {

                if (list.user_id == user.id)
                    return response.send(list);

                return response
                    .status(403)
                    .send({ message: "Forbideen" })
            }
        }

        return response
            .status(400)
            .send({ message: "bad request" })

    }

    async create({ auth, request, response }) {
        const rules = {
            name: 'required'
        }

        const data = request.only(['name'])
        const validation = await validate(data, rules)

        if (validation.fails()) {
            return response
                .status(400)
                .send(validation.messages())
        }

        const user = auth.user;
        const list = new List();


        list.name = data.name;

        const newList = await user.lists().save(list)

        if (newList) {
            return response.status(201).send(list);
        }



    }

    // TODO better validation
    async remove({ params, auth, request, response }) {
        if (params.id) {
            const user = auth.user;

            const list = await List.find(params.id);
            if (list && list.user_id == user.id) return response.status(200).send({ message: list.delete() });
            if (list == null) return response.status(404).send({ message: "List does not exist" });
            return response.status(403).send({ message: "List does not belong to this user" });



        }
        return response.status(400).send({ message: "no id supplied" });
    }

    // TODO better validation
    async update({ params, auth, request }) {
        if (params.id) {
            const user = auth.user;
            const list = await List.find(params.id);
            const data = request.only(['name'])

            if (list && list.user_id == user.id) {
                list.merge(data)
                await list.save()

                return list;

            }
        }
    }
}

module.exports = ListController
