import re
import string


class Parse:
    def __init__(self, file_name: str):
        """ Parse is used to parse the twitter text to match the AFINN

        Attributes:
            _file_name: the path of AFFIN.txt file
            _melb_grid: melbourne grid helper object
            _affin: dictionary maps the words in AFFIN and their scores
            _affin_phrase: list of phrases in AFFIN
            _reg_affin_phrase_str: string that used to match the phrases in the teitter text
        """
        self._file_name = file_name
        self._afinn = {}
        self._afinn_phrase = []
        self._reg_affin_phrase_str = "\\s|[!,.\'\"]"
        # read the file AFFIN and map words to score
        with open(self._file_name, "r") as f:
            for str in f.readlines():
                entry = str.split()
                if (len(entry) > 2):
                    length = len(entry)
                    words = entry[0]
                    for i in range(1, length - 1):
                        words = words + ' ' + entry[i]
                    self._reg_affin_phrase_str += "|"+words
                    self._afinn_phrase.append(words)
                    self._afinn[words] = int(entry[length - 1])
                else:
                    self._afinn[entry[0]] = int(entry[1])

    def parse(self, text: str):
        """phrase the twitter text

        Args:
            text (str): twitter text

        Return
            Tuple(grid_idx: int, sentiment_score: int): tuple of the grid id and the sentiment scores of this grid
        """
        sentiment_score = 0
        msg = text.rstrip(",\r\n ")

        # phrase the message
        # 1. exactly match the phrase
        phrase_list = []
        for phrase in self._afinn_phrase:
            pattern = '[\s]' + phrase + "[!.,\'\"]"
            phrase_match = re.compile(pattern)
            temp = phrase_match.findall(msg)
            if len(temp) == 1:
                phrase_list.append(temp)

        # 2. throw away phrases matched and split the remaining words by blank space and .!?'"
        phrase_split = re.compile(self._reg_affin_phrase_str)
        words = phrase_split.split(msg)

        # 3. exactly match the words
        word_list = []
        word_match = re.compile("^[a-z]+$")
        for word in words:
            temp = word_match.findall(word)
            if len(temp) == 1:
                word_list.append(temp[0])
        word_list += phrase_list
        for word in word_list:
            try:
                if word in self._afinn.keys():
                    sentiment_score += self._afinn[word]
            except Exception:
                pass

        return sentiment_score

def clean_tweet(tweet):

    # remove old style retweet text "RT"
    tweet = re.sub(r'^RT[\s]+', '', tweet)

    # remove hyperlinks
    tweet = re.sub(r'https?:\/\/.*[\r\n]*', '', tweet)

    # remove hashtags
    # only removing the hash # sign from the word
    tweet = re.sub(r'#', '', tweet)

    # remove punctuation
    table = str.maketrans({key: None for key in string.punctuation})
    tweet = tweet.translate(table)

    clean_tweet = tweet.lower().split()
    return set(clean_tweet)


if __name__ == '__main__':
    tweet_parser = Parse("../common/AFINN.txt")
    tweet = "RT @RachClarkWrites: This looks great! Which ones we signing up for guys? #AusWrites https://t.co/zFwS1MZt4g"
    print(tweet_parser.parse(tweet))
    print(clean_tweet(tweet))