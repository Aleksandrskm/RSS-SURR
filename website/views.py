from flask import Blueprint, render_template, url_for

views = Blueprint("views", __name__)


@views.route('/')
def index():
    return render_template('base.html')


@views.route('/plan_RSS')
def function_plan_RSS():
    return render_template('plan_RSS.html')

@views.route('/transmitting_antennas_RSS')
def function_transmitting_antennas_RSS():
    return render_template('transmitting_antennas_RSS.html')