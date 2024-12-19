import {Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useContext, useState} from "react";
import { styles } from './Style'
import {TaskContext} from "../../contexts/task/TaskProvider";
import {taskTypes} from "../../classes/taskType";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {deadlines} from "../../classes/deadlines";
import {TaskDeadlines} from "../../classes/taskDeadlines";
import {generateId} from "../../scripts/generateId";
import {getTypeNameViaId} from "../../scripts/getTypeNameViaId";
import {dailys} from "../../classes/dailys";
import {TaskDaily} from "../../classes/taskDaily";

export const CreateTask = ({ navigate }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const { addTask } = useContext(TaskContext);
    const [deadline, setDeadline] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const handleConfirmDate = (date) => {
        setDeadline(Math.floor(date.getTime() / 1000));
        setDatePickerVisibility(false);
    };


    const handleSubmit = () => {
        if (!taskName.trim() || !taskDescription.trim() || !value) {
            Alert.alert('Ошибка', 'Все поля должны быть заполнены!');
            return;
        }

        const id = generateId()
        console.log('value --> ' + value)
        addTask(id, taskName, taskDescription, value)

        const typeName = getTypeNameViaId(value, taskTypes);

        if(typeName === 'С датой окончания'){
            deadlines.push(new TaskDeadlines(id, Date.now() + 300000))
        }
        else if(typeName === 'Ежедневные'){
            dailys.push(new TaskDaily(id, Date.now()))
        }

        setValue('')
        setTaskName('')
        setTaskDescription('')
        setDeadline('')
    };

    const getTypeNameViaId = (value) => {
        for(let typeObj of taskTypes){
            if(typeObj.id === value){
                return typeObj.typeName;
            }
        }
        return ''
    }

    const items = taskTypes.map((taskType) => ({
        label: taskType.typeName,
        value: taskType.id,
    }));

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.mainText}>Создать задачу</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Название задачи'
                    value={taskName}
                    onChangeText={setTaskName}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Описание'
                    value={taskDescription}
                    onChangeText={setTaskDescription}
                />

                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    placeholder="Выберите тип"
                    style={styles.input}
                    dropDownContainerStyle={styles.dropdownContainer}
                />

                {
                    getTypeNameViaId(value) === 'С датой окончания' ?
                        <>
                            <TouchableOpacity
                                style={[styles.input, styles.dateInput]}
                                onPress={() => setDatePickerVisibility(true)}
                            >
                                <Text>
                                    {taskDescription
                                        ? `Выбранная дата: ${new Date(taskDescription * 1000).toLocaleDateString()}`
                                        : 'Выберите дату окончания'}
                                </Text>
                            </TouchableOpacity>

                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirmDate}
                                onCancel={() => setDatePickerVisibility(false)}
                            />
                        </>
                    : null
                }




                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Создать</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}