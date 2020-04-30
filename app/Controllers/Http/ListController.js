'use strict'
const User = use('App/Models/User')
const List = use('App/Models/List')
const { validate } = use('Validator')

class ListController {
    async index({ auth, request }) {
        const user = auth.user;
        return await user.lists().fetch();

    }

    async create({ auth, request }) {
        const rules = {
            name: 'required'
        }

        const data = request.only(['name'])
        const validation = await validate(data, rules)

        if (validation.fails()) {
            return validation.messages()
        }
        const user = auth.user;
        const list = new List();


        list.name = data.name;

        return await user.lists().save(list);


    }

    // TODO better validation
    async remove({ params, auth, request }) {
        if (params.id) {
            const user = auth.user;

            const list = await List.find(params.id);

            if (list && list.user_id == user.id) {
                return list.delete();
            }


        }

        return false;
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
