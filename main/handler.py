
def sum_handler(list_of_args):
    if len(list_of_args) == 0:
        return '=>You must write any non-negativ numbers to sum. Only integer type. Example \' sum 4 51 1\' =>56'
    else:
        sum_elem = 0
        for num in list_of_args:
            if not num.isdigit():
                return '=>You must write any non-negativ numbers to sum. Only integer type. Example \' sum 4 51 1\' =>56'
            else:
                sum_elem += int(num)
        return '=>'+str(sum_elem)


def find_max_palindrome_handler(list_count_digits):
    if len(list_count_digits) != 1:
        return '=>You must write one number not more than 6.Only integer type. Example \' find_max_palindrome 2\' =>9009'
    count_digits = list_count_digits[0]
    if not count_digits.isdigit():
        return '=>You must write only integer type number not more than 6. Example \' find_max_palindrome 2\' =>9009'
    count_digits_int = int(count_digits)
    if count_digits_int >= 6:
        return '=>You must write only integer type number not more than 6. Example \' find_max_palindrome 2\' =>9009'
    else:
        max_value = int('9'*count_digits_int)
        min_value = int('1'+'0'*(count_digits_int-1))
        max_number = str(max_value**2)
        first_part = max_number[0:len(max_number)/2]
        for number in xrange(int(first_part), min_value, -1):
            str_number = str(number)
            palindrome = int(str_number + str_number[::-1])
            for div in xrange(max_value, min_value, -1):
                if palindrome % div == 0 and min_value < palindrome/div < max_value:
                    results = '=>The largest palindrome, ' \
                              'the product of two {}-digit numbers = {}'.format(count_digits, palindrome)
                    return results


def sum_factorial_handler(list_with_num_factorial):
    """
    factorial function without using recursion
    and calculation of sum the result's digits
    """
    if len(list_with_num_factorial) != 1:
        return '=>You must write one integer number > 1. Example \' sum_factorial 3\' =>6'
    else:
        num_factorial = list_with_num_factorial[0]
        if not num_factorial.isdigit():
                return '=>You must write one integer number > 1. Example \' sum_factorial 3\' =>6'
        int_num_factorial = int(num_factorial)
        if int_num_factorial<=1:
                return '=>You must write one integer number > 1. Example \' sum_factorial 3\' =>6'
        else:
            value = 1
            for x in xrange(2, int_num_factorial+1):
                value *= x
            factorial = value
            string_factorial = str(factorial)
            sum = 0
            for digit in string_factorial:
                sum += int(digit)
            results = '=>'+'Sum of the digits in the factorial {}! is equal {}'.format(num_factorial, sum)
            return results


def anynumber_handler(list_arum):
    if len(list_arum) != 0:
        return '=>This command do not take any arumenst. Example \' anynumber \' =>123456...'
    else:
        results = '=>'+'1234567890'*8
        return results

def bracket_handler(list_with_numb_bracket):
    if len(list_with_numb_bracket) != 1:
        return '=>You must write one number > 0. Only integer type. Example \' bracket 3\' =>5'
    else:
        numb_bracket = list_with_numb_bracket[0]
        if not numb_bracket.isdigit():
                return '=>You must write one number > 0. Only integer type. Example \' bracket 4\' =>5'
        else:
            number_bracket = str(numb_bracket)
            # validation block
            if len(number_bracket.split('.')) > 1 or int(number_bracket) != float(number_bracket):
                raise ValueError('=>Input value is not valid. It should be integer.')

            number_bracket = int(number_bracket)
            if number_bracket < 1:    # limited only values > 0
                raise ValueError('=>Input value is not valid. It should be more then 0.')

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
            results = '=>Count of possible combinations = %s' % len(possible_combinations)
            return results


def help_handler(list_with_command):
    help_inf = {
            'help':'Command \"help\" for interactive help, or \"help command_name\"  for help about object.',
            'sum': 'Command \"sum\" takes any non-negativ numbers of arguments and return '
                  'sum of all arguments.'
                  ' Arguments must be integer type. Example : sum 3 100 20 =>123',
            'bracket': ' Command \"bracket\" takes one argument N and return '
                        'the number of all posible correct bracket expression,'
                        ' which contains N opening and N closing brackets.'
                        'There are exemples of correct bracket expression:'
                        '\'()()()\'(N=3), \'((())()\'(N=4),\'()(()())\'(N=4).'
                        ' And there are exemples of non-correct bracket expression'
                        '\'()((\'(N=2), \')(()))\'(N=3),\'()(())))\'(N=4),'
                       ' N must be integer non-negative type.'
                       ' Example \' sum_factorial 3\' =>Count of possible combinations = 6',
            'anynumber': 'This command do not take any argumenst, '
                         'it just return string with numbers 123456....'
                         ' Example \' anynumber \' =>123456...' ,
            'sum_factorial':' Command \"sum_factorial\" takes one integer number N > 1 '
                            'and return the summary value of all digits in '
                            'results of the calculation factorial N!(which equal N*(N-1)*(N-2)*..*2*1)'
                            ' Example \' sum_factorial 3\' '
                            '=>Sum of the digits in the factorial 3! is equal 6',
            'find_max_palindrome': 'Command \"find_max_palindrome\" takes one '
                        'argument N, and return the largest palindrome'
                        ' made from the product of two N-digit numbers.'
                         ' N must be integer type, non-negative and N<6, '
                        'because time of calculation extremely rises. '
                         ' A palindromic number is number, which reading the same both ways.'
                         ' Example of palindromic number:\'141141\',\'50205\'. '
                         ' Example \' find_max_palindrome 2\' =>The largest palindrome, '
                        'the product of two 2-digit numbers = 9009'
                   }
    if len(list_with_command) == 0:
       list_all_commands = help_inf.keys()
       str_all_commands = '\', \''.join(list_all_commands)
       return 'Command \"help\" for interactive help, or \"help command_name\"  for help about object. ' \
               'The list of all built-in commands [\' '+str_all_commands+' \']'
    if len(list_with_command) == 1:
        search_command = list_with_command[0]
        return '=>'+help_inf[search_command]
    else:
        return 'You must write only one command,' \
               ' Example \' help sum\' =>this command ..'






