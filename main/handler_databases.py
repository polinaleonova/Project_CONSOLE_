from models_project.models import History, Course , Person


def handler_db_person():
    pass


def handler_db_courses():
    data = {}
    dict_of_all_courses = {}
    data_all = Course.objects.all()
    for i in range(len(data_all)-1):
        dict_of_all_courses[str(data_all[i])] = Person.objects.filter(courses=data_all[i]).count()
    list_closed_set = []
    list_opened_set = []
    for key in dict_of_all_courses.keys():
        if dict_of_all_courses.get(key) > 1:
            list_closed_set.append(key)
        else:
            list_opened_set.append(key)
    data['list_closed_set'] = list_closed_set
    data['list_opened_set'] = list_opened_set
    data['closed'] = 'There courses set was stopped. If you want to registrer in the next set, send the request to us'
    data['opened'] = 'There courses set are opening. You can registrer on any.'

    return data
