import { IUpdateUserRequestPattern } from "../useCases/UserUseCases/UpdateUserUseCase/UpdateUserRequestPattern";

export class UpdateQueryGenerator {

    static updateUserQuery(props: IUpdateUserRequestPattern) {
        let updateFields = [];
        
        if (props.hasOwnProperty('name')) {
            if (props.name !== undefined) updateFields.push(`name = '${props.name}'`);
        }
    
        if (props.hasOwnProperty('password')) {
            if (props.password !== undefined) updateFields.push(`password = '${props.password}'`);
        }
    
        if (props.hasOwnProperty('login')) {
            if (props.login !== undefined) updateFields.push(`login = '${props.login}'`);
        }
    
        if (updateFields.length > 0) {
            const updateQuery = `UPDATE users SET ${updateFields.join(', ')} WHERE id = '${props.id}';`;
            return updateQuery;

        } else {
            return null; 
        }
    }

}