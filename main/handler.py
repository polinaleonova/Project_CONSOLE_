import json


def sum_handler(*args, **kwargs):
    results = {}
    unicode_arg_string = kwargs['optional']
    arg_string_type = unicode_arg_string.encode('utf-8')
    list_all_elements_str = arg_string_type.split('/')
    sum_arguments = 0
    for elem in range(len(list_all_elements_str)):
        sum_arguments += int(list_all_elements_str[elem])
    results['parameter'] = '=>'+str(sum_arguments)
    return json.dumps(results)


def find_max_palindrome_handler(count_digits):
    results = {}
    count_digits_int = int(count_digits)
    max_value = int('9'*count_digits_int)
    min_value = int('1'+'0'*(count_digits_int-1))
    max_number = str(max_value**2)
    first_part = max_number[0:len(max_number)/2]
    for number in xrange(int(first_part), min_value, -1):
        str_number = str(number)
        palindrome = int(str_number + str_number[::-1])
        for div in xrange(max_value, min_value, -1):
            if palindrome % div == 0 and min_value < palindrome/div < max_value:
                results['parameter'] = '=>'+str(palindrome)
                return json.dumps(results)


def find_sum_digits_factorial_handler(num_factorial):
    """
    factorial function without using recursion
    and calculation of sum the result's digits
    """
    results = {}
    value = 1
    for x in xrange(2, num_factorial+1):
        value *= x
    factorial = value
    string_factorial = str(factorial)
    sum = 0
    for digit in string_factorial:
        sum += int(digit)
    results['parameter'] = '=>'+'Sum of the digits in the number {}! is equal {}'.format(num_factorial, sum)
    return json.dumps(results)


def anynumber_handler():
    results = {}
    results['parameter'] = '=>'+'1234567890'*8
    return json.dumps(results)

def bracket_handler(numb_bracket):
    number_bracket = str(numb_bracket)
    # validation block
    if len(number_bracket.split('.')) > 1 or int(number_bracket) != float(number_bracket):
        raise ValueError('Input value is not valid. It should be integer.')

    number_bracket = int(number_bracket)
    if number_bracket < 1:    # limited only values > 0
        raise ValueError('Input value is not valid. It should be more then 0.')

    # following function verify bracket expression for correctness
    def check_open_closed(char_combine):
        if char_combine.count(')') != char_combine.count('('):
            return False  # is not valid sequence of brackets
        check_open_closed = 0
        for char in char_combine:
            if char == '(':
                check_open_closed += 1
            if char == ')':
                check_open_closed -= 1
            if check_open_closed < 0:
                return False  # is not valid sequence of brackets
        return True  # valid sequence of brackets

    def get_all_correct_brack_combinations(number_of_bracket):
        # creating the list and filling them pairs : '0' and '1' (equal '(' and ')') for given number of brackets
        brackets = []
        for x in xrange(number_of_bracket):
            brackets.append('0')
            brackets.append('1')

        # for N=2 we have brackets = ['0', '1', '0', '1']
        brackets.sort()   # sort in increasing
        brackets.reverse()  # in descending
        # for N=2 we have brackets = ['1', '1', '0', '0']

        binary_max = ''.join(brackets)  # convert list to the string
        # for N=2 binary_max = '1100'

        dex_count = int(binary_max, 2)  # convert string in integer in binary system
        # for N=2 dex_count = 12

        possible_combinations_bin = set()
        for_zfill = number_of_bracket * 2  # for filling by zero in left

        # following block to search all combinations of '0' and '1'
        # i.e. to translate from the decimal system to binary all values from 0 to dex_count
        for dex in xrange(0, dex_count + 1):
            bin_text = "{:b}".format(dex)  # convert dex to bin
            # '110' for dex = 6
            bin_text = bin_text.zfill(for_zfill)  # '0110' we add 0 in left of bin_text for keeping format of count brackets
            possible_combinations_bin.add(bin_text)

        possible_combinations = set()
        # following block to limit the set, which we will work on,
        # We append in list "possible_combinations" only those strings of '0' and '1' ,which have equal number '0' and '1'
        # and which has correct sequence on brackets
        for combine in possible_combinations_bin:
            combine = combine.replace('0', '(').replace('1', ')')
            if check_open_closed(combine):
                possible_combinations.add(combine)

        return possible_combinations

    # result for first approach
    possible_combinations = get_all_correct_brack_combinations(number_bracket)
    results = {}
    results['parameter'] = 'Count of possible combinations = %s' % len(possible_combinations)
    return json.dumps(results)


def help_command_handler(*args, **kwargs):
    command_info={'sum':'Command \"sum\" takes any numbers of arguments and return sum of all arguments.\n Arguments must be number type. Example : sum 3 100 =>103'}
    unicode_arg_string = kwargs['optional']
    arg_string_type = unicode_arg_string.encode('utf-8')

    results = {}
    results['parameter'] = command_info[arg_string_type]
    return json.dumps(results)

# 'ololo. You can use this function...If you want to know more about some function, use help <function_name>'}





