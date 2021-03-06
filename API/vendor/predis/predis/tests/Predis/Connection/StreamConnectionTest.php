<?php

/*
 * This file is part of the Predis package.
 *
 * (c) Daniele Alessandri <suppakilla@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Predis\Connection;

/**
 *
 */
class StreamConnectionTest extends PredisConnectionTestCase
{
    /**
     * @group disconnected
     */
    public function testConstructorDoesNotOpenConnection()
    {
        $connection = new StreamConnection($this->getParameters());

        $this->assertFalse($connection->isConnected());
    }

    /**
     * @group disconnected
     */
    public function testExposesParameters()
    {
        $parameters = $this->getParameters();
        $connection = new StreamConnection($parameters);

        $this->assertSame($parameters, $connection->getParameters());
    }

    /**
     * @group disconnected
     * @expectedException InvalidArgumentException
     * @expectedExceptionMessage Invalid scheme: udp
     */
    public function testThrowsExceptionOnInvalidScheme()
    {
        $parameters = $this->getParameters(array('scheme' => 'udp'));
        $connection = new StreamConnection($parameters);
    }

    /**
     * @group disconnected
     */
    public function testCanBeSerialized()
    {
        $parameters = $this->getParameters(array('alias' => 'redis', 'read_write_timeout' => 10));
        $connection = new StreamConnection($parameters);

        $unserialized = unserialize(serialize($connection));

        $this->assertEquals($connection, $unserialized);
    }

    // ******************************************************************** //
    // ---- INTEGRATION TESTS --------------------------------------------- //
    // ******************************************************************** //

    /**
     * @group connected
     */
    public function testAcceptsTcpNodelayParameter()
    {
        if (!version_compare(PHP_VERSION, '5.4.0', '>=')) {
            $this->markTestSkipped('Setting TCP_NODELAY on PHP socket streams works on PHP >= 5.4.0');
        }

        $connection = new StreamConnection($this->getParameters(array('tcp_nodelay' => false)));
        $connection->connect();
        $this->assertTrue($connection->isConnected());

        $connection = new StreamConnection($this->getParameters(array('tcp_nodelay' => true)));
        $connection->connect();
        $this->assertTrue($connection->isConnected());
    }

    /**
     * @group connected
     */
    public function testReadsMultibulkRepliesAsIterators()
    {
        $connection = $this->getConnection($profile, true, array('iterable_multibulk' => true));

        $connection->executeCommand($profile->createCommand('rpush', array('metavars', 'foo', 'hoge', 'lol')));
        $connection->writeCommand($profile->createCommand('lrange', array('metavars', 0, -1)));

        $this->assertInstanceOf('Predis\Iterator\MultiBulkResponse', $iterator = $connection->read());
        $this->assertSame(array('foo', 'hoge', 'lol'), iterator_to_array($iterator));
    }

    /**
     * @group connected
     * @expectedException Predis\Protocol\ProtocolException
     * @expectedExceptionMessage Unknown prefix: 'P'
     */
    public function testThrowsExceptionOnProtocolDesynchronizationErrors()
    {
        $connection = $this->getConnection($profile);
        $stream = $connection->getResource();

        $connection->writeCommand($profile->createCommand('ping'));
        fread($stream, 1);

        $connection->read();
    }

    // ******************************************************************** //
    // ---- HELPER METHODS ------------------------------------------------ //
    // ******************************************************************** //

    /**
     * {@inheritdoc}
     */
    protected function getConnection(&$profile = null, $initialize = false, Array $parameters = array())
    {
        $parameters = $this->getParameters($parameters);
        $profile = $this->getProfile();

        $connection = new StreamConnection($parameters);

        if ($initialize) {
            $connection->pushInitCommand($profile->createCommand('select', array($parameters->database)));
            $connection->pushInitCommand($profile->createCommand('flushdb'));
        }

        return $connection;
    }
}
